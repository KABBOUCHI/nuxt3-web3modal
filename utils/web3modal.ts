import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createClient } from '@wagmi/core'
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains'

const chains = [arbitrum, mainnet, polygon]
const projectId = '42e9e3b646c9102371bd147b3e960c39'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])

export const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
})

export const ethereumClient = new EthereumClient(wagmiClient, chains)

export const web3modal = new Web3Modal({ projectId }, ethereumClient)