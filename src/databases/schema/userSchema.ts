import { tableSchema } from '@nozbe/watermelondb';

const userSchema = tableSchema({
    name:'usuarios',
    columns:[
        {
            name:'user_id',
            type:'string'
        },
        {
            name:'name',
            type:'string'
        },
        {
            name:'email',
            type:'string'
        },
        {
            name:'photo',
            type:'string'
        },
        {
            name:'codrepre',
            type:'string'
        },
        {
            name:'cnpj_emp',
            type:'string'
        },
        {
            name:'token',
            type:'string'
        }
    ]
})

export {userSchema}