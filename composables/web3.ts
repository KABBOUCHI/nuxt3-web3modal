import { getAccount, getNetwork, switchNetwork as wSwitchNetwork, watchAccount, watchNetwork, Provider, fetchSigner, Signer, getProvider } from "@wagmi/core"

const account = ref<string>()
const chainId = ref<number | undefined>()
const provider = shallowRef<Provider | undefined>()
const signer = shallowRef<Signer | undefined>()

export const useWeb3 = () => {
    onMounted(() => {
        const handlers = [
            watchAccount(async () => {
                account.value = getAccount().address
                provider.value = getProvider({
                    chainId: chainId.value
                })
                signer.value = await fetchSigner({
                    chainId: chainId.value
                }) as any
            }),
            watchNetwork(() => {
                chainId.value = getNetwork().chain?.id
            })
        ]
        return () => {
            for (const handler of handlers) {
                handler()
            }
        }
    })

    const sendTransaction = () => {
    }

    const openModal = () => {
        web3modal.openModal()
    }

    const switchNetwork = async (chainId: number) => {
        await wSwitchNetwork({
            chainId
        })
    }

    return { account, chainId, openModal, provider, signer, switchNetwork, sendTransaction }
}