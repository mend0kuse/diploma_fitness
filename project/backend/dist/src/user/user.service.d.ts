import { Prisma, Profile, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    private include;
    getUserOrders(user: User): Promise<({
        workout: {
            trainer: {
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
            } & {
                id: number;
                email: string;
                role: string;
                password: string;
            };
        } & {
            id: number;
            trainerId: number;
            title: string;
            description: string;
            sportType: string;
            status: string;
            maxPlaces: number;
            dateStart: Date;
            durationMinutes: number;
        };
    } & {
        id: number;
        clientId: number;
        status: string;
        workoutId: number;
    })[] | {
        participants: {
            id: number;
            email: string;
            role: string;
            password: string;
        }[];
        id: number;
        trainerId: number;
        title: string;
        description: string;
        sportType: string;
        status: string;
        maxPlaces: number;
        dateStart: Date;
        durationMinutes: number;
        orders: ({
            id: number;
            clientId: number;
            status: string;
            workoutId: number;
        } & {
            client?: {
                id: number;
                email: string;
                role: string;
                password: string;
            };
        })[];
    }[]>;
    getOne({ id, email }: {
        id?: number;
        email?: string;
    }): Promise<{
        chats: {
            id: number;
            messages: {
                id: number;
                createdAt: Date;
                message: string;
                userId: number;
                chatId: number;
            }[];
            users: ({
                id: number;
                email: string;
                role: string;
                password: string;
            } & {
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
            })[];
        }[];
        id: number;
        email: string;
        role: string;
        password: string;
    }>;
    getMany(args: Prisma.UserFindManyArgs): Promise<({
        id: number;
        orders: {
            id: number;
            clientId: number;
            status: string;
            workoutId: number;
        }[];
        _count: {
            profile: number;
            chatMessages: number;
            chats: number;
            trainerWorkouts: number;
            orders: number;
            payments: number;
            myReviews: number;
            leavedReviews: number;
        };
        email: string;
        role: string;
        password: string;
        profile: {
            id: number;
            userId: number;
            name: string;
            status: string;
            avatar: string;
        };
        chatMessages: {
            id: number;
            createdAt: Date;
            message: string;
            userId: number;
            chatId: number;
        }[];
        chats: ({
            userId: number;
            chatId: number;
        } | ({
            user: {
                id: number;
                email: string;
                role: string;
                password: string;
            };
            userId: number;
            chatId: number;
            chat: {
                id: number;
            } | ({
                id: number;
                _count: {
                    messages: number;
                    users: number;
                };
                messages: ({
                    id: number;
                    createdAt: Date;
                    message: string;
                    userId: number;
                    chatId: number;
                } | ({
                    user: {
                        id: number;
                        email: string;
                        role: string;
                        password: string;
                    } | ({
                        id: number;
                        orders: {
                            id: number;
                            clientId: number;
                            status: string;
                            workoutId: number;
                        }[];
                        _count: {
                            profile: number;
                            chatMessages: number;
                            chats: number;
                            trainerWorkouts: number;
                            orders: number;
                            payments: number;
                            myReviews: number;
                            leavedReviews: number;
                        };
                        email: string;
                        role: string;
                        password: string;
                        profile: {
                            id: number;
                            userId: number;
                            name: string;
                            status: string;
                            avatar: string;
                        };
                        chatMessages: {
                            id: number;
                            createdAt: Date;
                            message: string;
                            userId: number;
                            chatId: number;
                        }[];
                        chats: {
                            userId: number;
                            chatId: number;
                        }[];
                        trainerWorkouts: {
                            id: number;
                            trainerId: number;
                            title: string;
                            description: string;
                            sportType: string;
                            status: string;
                            maxPlaces: number;
                            dateStart: Date;
                            durationMinutes: number;
                        }[];
                        payments: {
                            id: string;
                            order_id: string;
                            ticketId: number;
                            status: string;
                            paid: boolean;
                            description: string;
                            value: string;
                            currency: string;
                            createdAt: Date;
                            expiresAt: Date;
                            freezeEndDate: Date;
                            userId: number;
                        }[];
                        myReviews: {
                            id: number;
                            rating: number;
                            text: string;
                            isHiddenUser: boolean;
                            userId: number;
                            authorId: number;
                        }[];
                        leavedReviews: {
                            id: number;
                            rating: number;
                            text: string;
                            isHiddenUser: boolean;
                            userId: number;
                            authorId: number;
                        }[];
                    } & {
                        id: number;
                        email: string;
                        role: string;
                        password: string;
                    });
                    id: number;
                    userId: number;
                    chatId: number;
                    chat: {
                        id: number;
                    };
                    createdAt: Date;
                    message: string;
                } & {
                    id: number;
                    createdAt: Date;
                    message: string;
                    userId: number;
                    chatId: number;
                }))[];
                users: ({
                    userId: number;
                    chatId: number;
                } | ({
                    user: {
                        id: number;
                        email: string;
                        role: string;
                        password: string;
                    } | ({
                        id: number;
                        orders: {
                            id: number;
                            clientId: number;
                            status: string;
                            workoutId: number;
                        }[];
                        _count: {
                            profile: number;
                            chatMessages: number;
                            chats: number;
                            trainerWorkouts: number;
                            orders: number;
                            payments: number;
                            myReviews: number;
                            leavedReviews: number;
                        };
                        email: string;
                        role: string;
                        password: string;
                        profile: {
                            id: number;
                            userId: number;
                            name: string;
                            status: string;
                            avatar: string;
                        };
                        chatMessages: {
                            id: number;
                            createdAt: Date;
                            message: string;
                            userId: number;
                            chatId: number;
                        }[];
                        chats: {
                            userId: number;
                            chatId: number;
                        }[];
                        trainerWorkouts: {
                            id: number;
                            trainerId: number;
                            title: string;
                            description: string;
                            sportType: string;
                            status: string;
                            maxPlaces: number;
                            dateStart: Date;
                            durationMinutes: number;
                        }[];
                        payments: {
                            id: string;
                            order_id: string;
                            ticketId: number;
                            status: string;
                            paid: boolean;
                            description: string;
                            value: string;
                            currency: string;
                            createdAt: Date;
                            expiresAt: Date;
                            freezeEndDate: Date;
                            userId: number;
                        }[];
                        myReviews: {
                            id: number;
                            rating: number;
                            text: string;
                            isHiddenUser: boolean;
                            userId: number;
                            authorId: number;
                        }[];
                        leavedReviews: {
                            id: number;
                            rating: number;
                            text: string;
                            isHiddenUser: boolean;
                            userId: number;
                            authorId: number;
                        }[];
                    } & {
                        id: number;
                        email: string;
                        role: string;
                        password: string;
                    });
                    userId: number;
                    chatId: number;
                    chat: {
                        id: number;
                    };
                } & {
                    userId: number;
                    chatId: number;
                }))[];
            } & {
                id: number;
            });
        } & {
            userId: number;
            chatId: number;
        }))[];
        trainerWorkouts: {
            id: number;
            trainerId: number;
            title: string;
            description: string;
            sportType: string;
            status: string;
            maxPlaces: number;
            dateStart: Date;
            durationMinutes: number;
        }[];
        payments: {
            id: string;
            order_id: string;
            ticketId: number;
            status: string;
            paid: boolean;
            description: string;
            value: string;
            currency: string;
            createdAt: Date;
            expiresAt: Date;
            freezeEndDate: Date;
            userId: number;
        }[];
        myReviews: ({
            id: number;
            rating: number;
            text: string;
            isHiddenUser: boolean;
            userId: number;
            authorId: number;
        } | ({
            user: {
                id: number;
                email: string;
                role: string;
                password: string;
            };
            id: number;
            userId: number;
            rating: number;
            text: string;
            isHiddenUser: boolean;
            authorId: number;
            author: {
                id: number;
                email: string;
                role: string;
                password: string;
            } | ({
                id: number;
                orders: {
                    id: number;
                    clientId: number;
                    status: string;
                    workoutId: number;
                }[];
                _count: {
                    profile: number;
                    chatMessages: number;
                    chats: number;
                    trainerWorkouts: number;
                    orders: number;
                    payments: number;
                    myReviews: number;
                    leavedReviews: number;
                };
                email: string;
                role: string;
                password: string;
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
                chatMessages: {
                    id: number;
                    createdAt: Date;
                    message: string;
                    userId: number;
                    chatId: number;
                }[];
                chats: {
                    userId: number;
                    chatId: number;
                }[];
                trainerWorkouts: {
                    id: number;
                    trainerId: number;
                    title: string;
                    description: string;
                    sportType: string;
                    status: string;
                    maxPlaces: number;
                    dateStart: Date;
                    durationMinutes: number;
                }[];
                payments: {
                    id: string;
                    order_id: string;
                    ticketId: number;
                    status: string;
                    paid: boolean;
                    description: string;
                    value: string;
                    currency: string;
                    createdAt: Date;
                    expiresAt: Date;
                    freezeEndDate: Date;
                    userId: number;
                }[];
                myReviews: {
                    id: number;
                    rating: number;
                    text: string;
                    isHiddenUser: boolean;
                    userId: number;
                    authorId: number;
                }[];
                leavedReviews: {
                    id: number;
                    rating: number;
                    text: string;
                    isHiddenUser: boolean;
                    userId: number;
                    authorId: number;
                }[];
            } & {
                id: number;
                email: string;
                role: string;
                password: string;
            });
        } & {
            id: number;
            rating: number;
            text: string;
            isHiddenUser: boolean;
            userId: number;
            authorId: number;
        }))[];
        leavedReviews: ({
            id: number;
            rating: number;
            text: string;
            isHiddenUser: boolean;
            userId: number;
            authorId: number;
        } | ({
            user: {
                id: number;
                email: string;
                role: string;
                password: string;
            };
            id: number;
            userId: number;
            rating: number;
            text: string;
            isHiddenUser: boolean;
            authorId: number;
            author: {
                id: number;
                email: string;
                role: string;
                password: string;
            } | ({
                id: number;
                orders: {
                    id: number;
                    clientId: number;
                    status: string;
                    workoutId: number;
                }[];
                _count: {
                    profile: number;
                    chatMessages: number;
                    chats: number;
                    trainerWorkouts: number;
                    orders: number;
                    payments: number;
                    myReviews: number;
                    leavedReviews: number;
                };
                email: string;
                role: string;
                password: string;
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
                chatMessages: {
                    id: number;
                    createdAt: Date;
                    message: string;
                    userId: number;
                    chatId: number;
                }[];
                chats: {
                    userId: number;
                    chatId: number;
                }[];
                trainerWorkouts: {
                    id: number;
                    trainerId: number;
                    title: string;
                    description: string;
                    sportType: string;
                    status: string;
                    maxPlaces: number;
                    dateStart: Date;
                    durationMinutes: number;
                }[];
                payments: {
                    id: string;
                    order_id: string;
                    ticketId: number;
                    status: string;
                    paid: boolean;
                    description: string;
                    value: string;
                    currency: string;
                    createdAt: Date;
                    expiresAt: Date;
                    freezeEndDate: Date;
                    userId: number;
                }[];
                myReviews: {
                    id: number;
                    rating: number;
                    text: string;
                    isHiddenUser: boolean;
                    userId: number;
                    authorId: number;
                }[];
                leavedReviews: {
                    id: number;
                    rating: number;
                    text: string;
                    isHiddenUser: boolean;
                    userId: number;
                    authorId: number;
                }[];
            } & {
                id: number;
                email: string;
                role: string;
                password: string;
            });
        } & {
            id: number;
            rating: number;
            text: string;
            isHiddenUser: boolean;
            userId: number;
            authorId: number;
        }))[];
    } & {
        id: number;
        email: string;
        role: string;
        password: string;
    })[]>;
    createUser(data: Prisma.UserCreateInput): Promise<Omit<{
        id: number;
        email: string;
        role: string;
        password: string;
    }, "password">>;
    update({ id, data }: {
        data: Prisma.UserUpdateInput;
        id: number;
    }): Promise<Omit<{
        profile: {
            id: number;
            userId: number;
            name: string;
            status: string;
            avatar: string;
        };
        chats: ({
            chat: {
                messages: ({
                    user: {
                        profile: {
                            id: number;
                            userId: number;
                            name: string;
                            status: string;
                            avatar: string;
                        };
                    } & {
                        id: number;
                        email: string;
                        role: string;
                        password: string;
                    };
                } & {
                    id: number;
                    createdAt: Date;
                    message: string;
                    userId: number;
                    chatId: number;
                })[];
                users: ({
                    user: {
                        profile: {
                            id: number;
                            userId: number;
                            name: string;
                            status: string;
                            avatar: string;
                        };
                    } & {
                        id: number;
                        email: string;
                        role: string;
                        password: string;
                    };
                } & {
                    userId: number;
                    chatId: number;
                })[];
            } & {
                id: number;
            };
        } & {
            userId: number;
            chatId: number;
        })[];
        payments: {
            id: string;
            order_id: string;
            ticketId: number;
            status: string;
            paid: boolean;
            description: string;
            value: string;
            currency: string;
            createdAt: Date;
            expiresAt: Date;
            freezeEndDate: Date;
            userId: number;
        }[];
        myReviews: ({
            author: {
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
            } & {
                id: number;
                email: string;
                role: string;
                password: string;
            };
        } & {
            id: number;
            rating: number;
            text: string;
            isHiddenUser: boolean;
            userId: number;
            authorId: number;
        })[];
        leavedReviews: ({
            author: {
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
            } & {
                id: number;
                email: string;
                role: string;
                password: string;
            };
        } & {
            id: number;
            rating: number;
            text: string;
            isHiddenUser: boolean;
            userId: number;
            authorId: number;
        })[];
    } & {
        id: number;
        email: string;
        role: string;
        password: string;
    }, "password">>;
    updateProfile({ profile, email }: {
        email?: string;
        profile: Profile;
    }): Promise<Omit<{
        chats: {
            id: number;
            messages: {
                id: number;
                createdAt: Date;
                message: string;
                userId: number;
                chatId: number;
            }[];
            users: ({
                id: number;
                email: string;
                role: string;
                password: string;
            } & {
                profile: {
                    id: number;
                    userId: number;
                    name: string;
                    status: string;
                    avatar: string;
                };
            })[];
        }[];
        id: number;
        email: string;
        role: string;
        password: string;
    }, "password">>;
    findAdmin(): Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        role: string;
        password: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    getStats(user: User): Promise<{
        workouts: {
            label: string;
            value: number;
        }[];
        attendance: {
            visited: number;
            missed: number;
            canceled: number;
        };
    }>;
}
