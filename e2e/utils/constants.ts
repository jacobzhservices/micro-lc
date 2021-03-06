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

export const baseUrl = process.env['BASE_URL'] || 'http://localhost:3000'
export const logoSelector = '[data-testid=company-logo]'
export const burgerSelector = '[data-testid=top-bar-side-menu-toggle]'
export const logoUrl = 'https://raw.githubusercontent.com/lauragift21/giftegwuenu.dev/master/src/assets/img/logo.png'
export const userMenuSelector = '[data-testid=userMenu_container]'
export const firstValidPlugin = `${baseUrl}/iframe`
