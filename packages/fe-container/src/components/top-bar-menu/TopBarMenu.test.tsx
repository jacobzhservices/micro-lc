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
import React from 'react'
import {screen} from '@testing-library/react'
import {Plugin} from '@mia-platform/core'
import userEvent from '@testing-library/user-event'

import RenderWithReactIntl from '../../__tests__/utils'
import {ConfigurationProvider} from '@contexts/Configuration.context'
import {TopBarMenu} from '@components/top-bar-menu/TopBarMenu'
import {registerPlugin} from '@utils/plugins/PluginsLoaderFacade'

describe('TopBarMenu tests', () => {
  const plugin: Plugin = {
    id: 'plugin-test-3',
    label: 'Href entry',
    icon: 'clipboard',
    order: 3,
    integrationMode: 'href',
    externalLink: {sameWindow: false, url: 'https://google.it'}
  }

  const configurationsBuilder = (menuLocation: 'sideBar' | 'topBar' | undefined, plugins: Plugin[] | undefined) => ({
    theming: {
      header: {},
      logo: {
        url_light: '',
        alt: ''
      },
      menuLocation,
      variables: {}
    },
    plugins
  })

  it('doesn\'t render for missing menuLocation', () => {
    const configuration = configurationsBuilder(undefined, undefined)
    RenderWithReactIntl(
      <ConfigurationProvider value={configuration}>
        <TopBarMenu/>
      </ConfigurationProvider>
    )
    expect(document.getElementsByClassName('topBarMenu_container').length).toBe(0)
  })

  it('doesn\'t render even with a plugin but missing menuLocation', () => {
    const configuration = configurationsBuilder(undefined, [plugin])
    RenderWithReactIntl(
      <ConfigurationProvider value={configuration}>
        <TopBarMenu/>
      </ConfigurationProvider>
    )
    expect(document.getElementsByClassName('topBarMenu_container').length).toBe(0)
  })

  it('doesn\'t render with menuLocation but empty plugins list', () => {
    const configuration = configurationsBuilder('topBar', [])
    RenderWithReactIntl(
      <ConfigurationProvider value={configuration}>
        <TopBarMenu/>
      </ConfigurationProvider>
    )
    expect(document.getElementsByClassName('topBarMenu_container').length).toBe(0)
  })

  it('doesn\'t render with menuLocation but undefined plugins list', () => {
    const configuration = configurationsBuilder('topBar', undefined)
    RenderWithReactIntl(
      <ConfigurationProvider value={configuration}>
        <TopBarMenu/>
      </ConfigurationProvider>
    )
    expect(document.getElementsByClassName('topBarMenu_container').length).toBe(0)
  })

  it('render with menuLocation and plugins list', () => {
    const {icon, ...rest} = plugin
    const configuration = configurationsBuilder('topBar', [rest])
    RenderWithReactIntl(
      <ConfigurationProvider value={configuration}>
        <TopBarMenu/>
      </ConfigurationProvider>
    )
    expect(screen.getByText('Href entry')).toBeTruthy()
  })

  it('click correctly route to new tab', () => {
    window.open = jest.fn()
    const configuration = configurationsBuilder('topBar', [plugin])
    registerPlugin(plugin)
    RenderWithReactIntl(
      <ConfigurationProvider value={configuration}>
        <TopBarMenu/>
      </ConfigurationProvider>
    )
    userEvent.click(screen.getByText('Href entry'))
    expect(window.open).toBeCalledWith('https://google.it')
  })

  it('correctly show sub menu', () => {
    window.open = jest.fn()
    const containerPlugin = {...plugin}
    // @ts-ignore
    containerPlugin.content = [{...plugin, label: 'Href entry sub menu'}]
    const configuration = configurationsBuilder('topBar', [containerPlugin])
    registerPlugin(plugin)
    RenderWithReactIntl(
      <ConfigurationProvider value={configuration}>
        <TopBarMenu/>
      </ConfigurationProvider>
    )
    expect(screen.getAllByText('Href entry')).toHaveLength(2)
    expect(screen.getAllByText('Href entry sub menu')).toHaveLength(1)
  })

  it('correctly show sub menu with categories', () => {
    window.open = jest.fn()
    const containerPlugin = {...plugin}
    // @ts-ignore
    containerPlugin.content = [{...plugin, label: 'Href entry sub menu', category: 'Cat A'}]
    const configuration = configurationsBuilder('topBar', [containerPlugin])
    registerPlugin(plugin)
    RenderWithReactIntl(
      <ConfigurationProvider value={configuration}>
        <TopBarMenu/>
      </ConfigurationProvider>
    )
    expect(screen.getAllByText('Href entry')).toHaveLength(2)
    expect(screen.getAllByText('Href entry sub menu')).toHaveLength(1)
    expect(screen.getAllByText('Cat A')).toHaveLength(1)
  })
})
