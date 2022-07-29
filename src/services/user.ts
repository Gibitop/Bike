import { prismaClient } from "@/common/lib/prisma";
import { User, Prisma } from "@prisma/client";

export const getUsers = async ({ skip, take }: { skip: number, take: number }) => {
    const where: Prisma.UserWhereInput = {}
    const [users, total] = await Promise.all([
        prismaClient.user.findMany({ where, skip, take }),
        prismaClient.user.count({ where }),
    ])
    return { users, total }
}

export const getUserById = (userId: User['id']) => {
    return prismaClient.user.findFirst({ where: { id: userId } })
}

export const createUser = (user: Prisma.UserCreateInput) => {
    return prismaClient.user.create({ data: user })
}

export const updateUser = ({ id, ...user }: Prisma.UserUpdateInput & Pick<User, 'id'>) => {
    return prismaClient.user.update({ where: { id }, data: user })
}

export const deleteUser = (id: User['id']) => {
    return prismaClient.user.delete({ where: { id } })
}
