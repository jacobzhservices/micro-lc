/*
 * Copyright 2021 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, {useContext} from 'react'
import {Plugin} from '@mia-platform/core'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {Divider} from 'antd'

import {ConfigurationContext} from '@contexts/Configuration.context'
import {PluginStrategy} from '@utils/plugins/strategies/PluginStrategy'
import {retrievePluginStrategy} from '@utils/plugins/PluginsLoaderFacade'
import {MENU_LOCATION} from '@constants'
import {retrieveCategorizedPlugins} from '@utils/menu/menuItemMapper'
import {useCurrentPlugin} from '@hooks/useCurrentPlugin/useCurrentPlugin'

import './TopBarMenu.less'

const entriesMapper = (plugin: Plugin) => <TopBarMenuEntry key={plugin.id} {...plugin}/>

export const TopBarMenu: React.FC = () => {
  const configuration = useContext(ConfigurationContext)
  const hasPlugins = (configuration.plugins || []).length > 0
  const shouldRender = configuration.theming?.menuLocation === MENU_LOCATION.topBar && hasPlugins

  return (
    <>
      {shouldRender &&
      <div className='topBarMenu_container'>
        {configuration.plugins?.map(entriesMapper)}
      </div>
      }
    </>
  )
}

const TopBarMenuEntry: React.FC<Plugin> = (plugin) => {
  const currentPlugin = useCurrentPlugin()
  const isActive = currentPlugin ? [plugin, ...plugin.content || []].find(plugin => plugin.id === currentPlugin.id) : false
  const pluginStrategy: PluginStrategy = retrievePluginStrategy(plugin)
  const hasSubMenu = (plugin.content || []).length > 0

  const topBarMenuContainerClasses = classNames('topBarMenu_entry', {active: isActive})

  return (
    <>
      <div className={topBarMenuContainerClasses} onClick={pluginStrategy.handlePluginLoad}>
        <i className={'topBarMenuEntry_icon ' + (plugin.icon || '')}/>
        <span className='topBarMenuEntry_text'>{plugin.label}</span>
        {
          hasSubMenu && <TopBarSubMenuOverlay {...plugin}/>
        }
      </div>
    </>
  )
}

const categoriesMapper = ([category, plugins]: [string, Plugin[]]) =>
  <TopBarSubCategoryMenu category={category} key={category} plugins={plugins}/>

const subMenuMapper = (plugin: Plugin) => <TopBarSubMenuEntry key={plugin.id} {...plugin}/>

const TopBarSubMenuOverlay: React.FC<Plugin> = (plugin) => {
  const {withoutCategories, categoriesDivision} = retrieveCategorizedPlugins(plugin)
  return (
    <div className='topBar_overlay'>
      <span className='overlay_title'>{plugin.label}</span>
      <Divider type='vertical'/>
      <div className='overlay_item_content'>
        {
          Object.entries(categoriesDivision).map(categoriesMapper)
        }
        {
          withoutCategories.map(subMenuMapper)
        }
      </div>
    </div>
  )
}

type TopBarSubCategoryMenuProps = { category: string, plugins: Plugin[] }

const TopBarSubCategoryMenu: React.FC<TopBarSubCategoryMenuProps> = ({category, plugins}) => {
  return (
    <div className='subgroup_title'>
      <div className='overlay_title'>{category}</div>
      {plugins.map(subMenuMapper)}
    </div>
  )
}

TopBarSubCategoryMenu.propTypes = {
  category: PropTypes.string.isRequired,
  plugins: PropTypes.array.isRequired
}

const TopBarSubMenuEntry: React.FC<Plugin> = (plugin) => {
  const pluginStrategy = retrievePluginStrategy(plugin)
  const currentPlugin = useCurrentPlugin()

  const classes = classNames('overlay_item', {active: currentPlugin?.id === plugin.id})

  return (
    <div className={classes} onClick={pluginStrategy.handlePluginLoad}>
      <span>{plugin.label}</span>
    </div>
  )
}
