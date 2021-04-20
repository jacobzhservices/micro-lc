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
import userEvent from '@testing-library/user-event'

import {HelpIcon} from '@components/help-icon/HelpIcon'
import RenderWithReactIntl from '../../__tests__/utils'

describe('Help icon tests', () => {
  it('Render without crash', () => {
    RenderWithReactIntl(<HelpIcon/>)
    expect(screen.findByTestId('help_button_test')).toBeTruthy()
  })

  it('Open new window with the url', async () => {
    window.open = jest.fn()
    RenderWithReactIntl(<HelpIcon/>)
    userEvent.click(await screen.findByTestId('help_button_test'))
    expect(window.open).toBeCalledWith('https://docs.mia-platform.eu/docs/business_suite/microlc/overview')
  })
})
