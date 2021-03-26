import React, {useState} from 'react'
import {Layout, Skeleton} from 'antd'
import {Configuration} from '@mia-platform/core'

import './Launcher.less'
import {TopBar} from '../../components/top-bar/TopBar'
import {LayoutContent} from '../../components/layout-content/LayoutContent'
import {ConfigurationProvider} from '../../contexts/Configuration.context'
import {MenuOpenedProvider} from '../../contexts/MenuOpened.context'
import {AppState} from '../../hooks/useConfiguration'
import {SideMenu} from '../../components/side-menu/SideMenu'

// eslint-disable-next-line
export const Launcher: React.FC<AppState> = ({configuration, isLoading}) => {
  return (
    <>
      {
        isLoading ?
          <Skeleton.Input active className='launcher_skeleton'/> :
          <LoadedLauncher {...configuration}/>
      }
    </>
  )
}

const LoadedLauncher: React.FC<Configuration> = (configuration) => {
  const [isMenuOpened, setMenuOpened] = useState(false)
  return (
    <ConfigurationProvider value={configuration}>
      <MenuOpenedProvider value={{isMenuOpened, setMenuOpened}}>
        <Layout>
          <Layout.Header className='launcher_header'>
            <TopBar/>
          </Layout.Header>
          <Layout.Content>
            <SideMenu plugins={configuration.plugins}/>
            <LayoutContent/>
          </Layout.Content>
        </Layout>
      </MenuOpenedProvider>
    </ConfigurationProvider>
  )
}
