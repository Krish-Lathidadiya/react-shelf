import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
export type Component={
    _id: string;
    name: string;
    projectName: string;
    code : string;
    isFavorite:boolean;
    createdAt:string;
}

export type Project={
    _id:string;
    clerkUserId:string;
    name:string;
    icon:string;
    createdAt:string;
    components:Component[];
}

export const allProjectsData:Project[]=[
    {
        _id:uuidv4(),
        clerkUserId:"",
        name:"Forms",
        icon:"categoryIcon",
        createdAt:"2022-01-01T00:00:00:000Z",
        components:[
            {
                _id:uuidv4(),
                name:"Form 1",
                projectName:"Form",
                code:"",
                isFavorite:false,
                createdAt:"2022-01-01T00:00:00:000Z",

            },
            {
                _id:uuidv4(),
                name:"Form 2",
                projectName:"Form",
                code:"",
                isFavorite:false,
                createdAt:"2022-01-01T00:00:00:000Z",

            },
            {
                _id:uuidv4(),
                name:"Form 3",
                projectName:"Form",
                code:"",
                isFavorite:false,
                createdAt:"2022-01-01T00:00:00:000Z",

            }
        ]
    },{
        _id:uuidv4(),
        clerkUserId:"",
        name:"Buttons",
        icon:"RectangleIcon",
        createdAt:"2022-01-01T00:00:00:000Z",
        components:[
            {
                _id:uuidv4(),
                name:"Button 1",
                projectName:"Buttons",
                code:"",
                isFavorite:false,
                createdAt:"2022-01-01T00:00:00:000Z",

            },
        
        ]

    }
]