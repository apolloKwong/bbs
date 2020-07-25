import { rpc } from 'utils'

const org = rpc('security/org')

export async function tree() {
    return org.list()
}

export async function getById(id) {
    return org.get(id)
}

export default org
