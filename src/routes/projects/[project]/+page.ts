export function load() {
    return {
        project: {
            title: 'Untitled project',
            columns: [
                {
                    id: 1,
                    title: 'To do',
                    tasks: [
                        {
                            id: 1456,
                            title: 'asdf',
                            details: 'details',
                            tags: [
                                {
                                    tag: 'important',
                                    color: 'red-700'
                                },
                                {
                                    tag: 'backend',
                                    color: 'blue-700'
                                }
                            ],
                            members: [
                                {
                                    member: 'John Doe',
                                    avatar: 'https://placehold.co/50'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Doing',
                    tasks: [
                        {
                            id: 98726,
                            title: 'title',
                            details: 'details',
                            tags: [
                                {
                                    tag: 'important',
                                    color: 'red-700'
                                }
                            ],
                            members: [
                                {
                                    member: 'John Doe',
                                    avatar: 'https://placehold.co/50'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'Done'
                }
            ]

        },
    }
}