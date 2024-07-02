import User from "../models/User.mjs";
import { isNotEmpty, equals, isValidPassword, isValidEmail, removeExcessSpaces } from "../util/Util.mjs";
import bcrypt from "bcryptjs";

export default class AuthController {
    static login(req, res) {
        res.render('auth/login');
    }

    static async loginPost(req, res) {
        const { email, password } = req.body;
        
        const user = await User.findOne({where: {email: email}});

        if (!user) {
            req.flash('message', 'Usuário não encontrado');
            res.render('auth/login');
            return;
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            req.flash('message', 'Usuário não encontrado');
            res.render('auth/login');
            return;
        }

        req.session.userid = user.id;

        req.flash('message', 'Autenticação realizado com sucesso');

        console.log('oi3', req.session);

        req.session.save(() => {
            res.redirect('/');
        });
    }

    static register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        // Validar nome
        if (!isNotEmpty(name)) {
            req.flash('message', 'O nome é inválido');
            res.render('auth/register');
            return;
        }

        // Validar email
        if (!isNotEmpty(email) || !isValidEmail(email)) {
            req.flash('message', 'O email é inválido');
            res.render('auth/register');
            return;
        }

        // Validar senha
        if (!isNotEmpty(password) || !isValidPassword(password) || !equals(password, confirmpassword)) {
            req.flash('message', 'As senha não é válida ou não coincidem');
            res.render('auth/register');
            return;
        }

        // Verificar se o email já está em uso          
        const existingUser = await User.findOne({ where: { email } });
      
        if (existingUser) {
            req.flash('message', 'Email já está em uso');
            res.render('auth/register');
            return;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        try {
            const user = await User.create({
                name: removeExcessSpaces(name),
                email,
                password: hashedPassword,
            });

            req.session.userid = user.id;

            console.log(user.id, 'oi1', req.session.userid);

            req.flash('message', 'Cadastro realizado com sucesso');  

            req.session.save(() => {
                console.log('session1' ,req.session);
                res.redirect('/');
            });
        } catch (error) {
            console.log(erro);
        }
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }
}