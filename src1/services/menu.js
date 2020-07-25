import { rpc } from 'utils'

const menu = rpc('menu')

export async function tree() {
    return menu.list()
}

export async function getById(id) {
    return menu.get(id)
}

export default menu