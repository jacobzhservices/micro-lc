import {FastifyInstance} from 'fastify'
import path from 'path'

export interface ProcessEnv {
  [key: string]: string | undefined
}

describe('mia_template_service_name_placeholder', () => {
  // eslint-disable-next-line global-require
  const lc39 = require('@mia-platform/lc39')

  let fastify: FastifyInstance

  async function setupFastify(envVariables: ProcessEnv) {
    fastify = await lc39('src/index.ts', {
      logLevel: 'silent',
      envVariables: {
        USERID_HEADER_KEY: 'miauserid',
        GROUPS_HEADER_KEY: 'miausergroups',
        CLIENTTYPE_HEADER_KEY: 'miaclienttype',
        BACKOFFICE_HEADER_KEY: 'miaisfrombackoffice',
        MICROSERVICE_GATEWAY_SERVICE_NAME: 'microservice-gateway',
        ...envVariables,
      },
    })
  }

  afterAll(async() => {
    await fastify.close()
  })

  test('Fastify correctly start', async() => {
    await setupFastify({
      AUTHENTICATION_CONFIGURATION_PATH: path.join(__dirname, '/configurationMocks/validAuthenticationConfig.json'),
      MICROLC_CONFIGURATION_PATH: path.join(__dirname, '/configurationMocks/validMicrolcConfig.json'),
    })
    expect(fastify).not.toBeNull()
  })

  test('Fastify fail for bad auth config path', async() => {
    const fastifySetup = async() => {
      await setupFastify({
        AUTHENTICATION_CONFIGURATION_PATH: path.join(__dirname, 'notExisting.json'),
        MICROLC_CONFIGURATION_PATH: path.join(__dirname, '/configurationMocks/validMicrolcConfig.json'),
      })
    }
    await expect(fastifySetup()).rejects.toThrow()
  })

  test('Fastify fail for bad microlc config path', async() => {
    const fastifySetup = async() => {
      await setupFastify({
        AUTHENTICATION_CONFIGURATION_PATH: path.join(__dirname, '/configurationMocks/validAuthenticationConfig.json'),
        MICROLC_CONFIGURATION_PATH: path.join(__dirname, 'notExisting.json'),
      })
    }
    await expect(fastifySetup()).rejects.toThrow()
  })
})
