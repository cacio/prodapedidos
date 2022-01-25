import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';


class User extends Model{
    static table = 'usuarios';

    @field('user_id')
    user_id!:string;
    
    @field('name')
    name!:string;

    @field('email')
    email!:string;

    @field('photo')
    photo!:string;

    @field('codrepre')
    codrepre!:string;
    
    @field('cnpj_emp')
    cnpj_emp!:string;

    @field('token')
    token!:string;
    
}

export {User}