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

import {Page} from 'playwright'

import {baseUrl, burgerSelector} from './constants'

export const waitMicrolcLoaded = async (page: Page) => {
  await page.goto(baseUrl)
  await page.waitForSelector(burgerSelector, {state: 'attached'})
}

export const toggleSideMenu = async (page: Page) => {
  await waitMicrolcLoaded(page)
  await page.$eval(burgerSelector, (element: any) => element.click())
}
