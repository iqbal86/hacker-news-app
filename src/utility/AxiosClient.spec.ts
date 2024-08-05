import axios from 'axios'
import { AxiosClient, IAxiosClient } from './AxiosClient'

jest.mock('axios')

const mockAxios = axios as jest.Mocked<typeof axios>

let client: IAxiosClient

describe('Axios Client tests', () => {
  beforeEach(async () => {
    mockAxios.create.mockReturnValue(mockAxios)

    client = new AxiosClient({
      baseURL: 'any',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  })
  it('should get data', async () => {
    mockAxios.get.mockResolvedValue({ data: 'something' })
    const result = await client.get('/')

    expect(mockAxios.get).toHaveBeenCalledWith('/')
    expect(result).toEqual('something')
  })
})
