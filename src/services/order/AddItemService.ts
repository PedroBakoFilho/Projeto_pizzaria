import prismaClient from "../../prisma";

interface ItemRequest {
    order_id: string,
    product_id: string,
    amout: number
}

class AddItemService {
    async execute({ order_id, product_id, amout }: ItemRequest) {
        const order = await prismaClient.item.create({
            data:{
                order_id: order_id,
                product_id: product_id,
                amout// SIM ESTÁ ESCRITO ERRADO, SIM EU ERREI NO BDD. NÃO EU NÃO VOU MUDAR! TA ACHANDO RUIM FAZ O SEU Ô MERDA
            }
        })
        return order; 
    }
}

export { AddItemService }
