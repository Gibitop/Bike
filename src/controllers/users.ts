import { createController, makeError } from "@/common/utils/createController";
import { paginationToSkipTake } from "@/common/utils/paginationToSkipTake";
import { createUserSchema, deleteUserSchema, getPaginatedUsersListSchema, getUserByIdSchema, updateUserSchema } from "@/schemas/users";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "@/services/user";

const controller = createController('users')

controller.get(
    ':id',
    { schema: getUserByIdSchema },
    async (req, res) => {
        const { id } = req.params
        const user = await getUserById(id)
        if (!user) {
            res.status(404)
            return makeError('User not found')
        }
        return user
    }
)

controller.get(
    '',
    { schema: getPaginatedUsersListSchema },
    async (req) => {
        const { pagination } = req.query
        const { users, total } = await getUsers(paginationToSkipTake(pagination))
        return {
            data: users,
            pagination: {
                ...pagination,
                total,
            }
        }
    }
)

controller.post(
    '',
    { schema: createUserSchema },
    req => createUser(req.body)
)

controller.put(
    '',
    { schema: updateUserSchema },
    req => updateUser(req.body)
)

controller.delete(
    ':id',
    { schema: deleteUserSchema },
    req => deleteUser(req.params.id)
)
