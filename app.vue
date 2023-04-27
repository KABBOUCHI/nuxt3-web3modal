<script setup lang="ts">
const { account, chainId, openModal, signer } = useWeb3()

const sendTx = async () => {
  await signer.value!.sendTransaction({
    from: account.value,
    to: account.value,
    value: 0
  })
}
</script>
<template>
  <div>
    <button @click="openModal">{{ account ? 'Account' : 'Connect' }}</button>

    <p>{{ account || '-' }}</p>
    <p>{{ chainId || '-' }}</p>

    <button @click="sendTx">Send Empty Tx</button>
  </div>
</template>
