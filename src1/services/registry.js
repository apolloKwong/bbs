import { rpc } from 'utils'

const registry = rpc('registry')

export async function tree() {
    return registry.list()
}

export async function getById(id) {
    return registry.get(id)
}

export default registry
