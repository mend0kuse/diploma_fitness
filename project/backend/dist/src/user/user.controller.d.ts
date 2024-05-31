/// <reference types="multer" />
import { RequestWithUser } from './user';
import { UserService } from './user.service';
import { Profile } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateProfile(request: RequestWithUser, dto: Profile, file?: Express.Multer.File): Promise<Omit<{
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
    getTrainers(): Promise<({
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
    getUserOrders({ user }: RequestWithUser): Promise<{
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
    }[] | ({
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
    })[]>;
    getUserStats({ user }: RequestWithUser): Promise<{
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
    getOne(id: number): Promise<Omit<{
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
}
