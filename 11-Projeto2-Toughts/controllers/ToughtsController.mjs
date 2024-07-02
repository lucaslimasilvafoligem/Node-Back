import { where } from "sequelize";
import Tought from "../models/Tought.mjs";
import User from "../models/User.mjs";
import { isNotEmpty, removeExcessSpaces } from "../util/Util.mjs";

import { Op } from "sequelize";

export default class ToughtsController {

    static createTought(req, res) {
        res.render('toughts/create');
    }

    static async createToughtSave(req, res) {
        const title = req.body.title;
        const userId = req.session.userid;

        if (!isNotEmpty(title)) {
            req.flash('message', 'Título inválido');
            res.render('toughts/create');
            return;
        }

        try {
            const user = await User.findOne({ where: { id: userId } });
      
            if (!user) {
                req.flash('message', 'Usuário não encontrado');
                res.render('/login');
                return;
            }

            await Tought.create({
                title: removeExcessSpaces(title),
                UserId: userId
            });

            req.flash('message', 'Pensamento criado com sucesso!');
            req.session.save(() => {
                res.redirect('dashboard');
            });
        } catch (error) {
            console.error('Erro ao criar pensamento:', error);
        }
    }

    static async remove(req, res) {
        const userId = req.session.userid;
        const id = req.body.id;

        try {
            await Tought.destroy( {where: {id:id, userId:userId }} );

            req.flash('message', 'Pensamento removido com sucesso!');

            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            });
        } catch (error) {
            console.log(`Aconteceu um erro ` + error);
        }
    }

    static async showToughts(req, res) {
        let search = '';

        if (req.query.search) {
            search = req.query.search;
        }

        let order = 'DESC';

        if (req.query.order === 'old') {
            order = 'ASC';
        }

        const toughtData = await Tought.findAll({
            include: User,
            where: {title: {[Op.like]: `%${search}%`}},
            order: [['createdAt', order]]
        });

        const toughts = toughtData.map((result) => result.get({ plain: true }));

        let toughtsQty = toughts.length;

        if (toughtsQty === 0) {
            toughtsQty = false;
        }

        res.render('toughts/home', { toughts, search, toughtsQty });
    }

    static async dashboard(req, res) {
        const userId = req.session.userid;

        try {
            const user = await User.findOne({
                where: { id: userId, },
                include: Tought,
                plain: true,
            });

            const toughts = user.Toughts.map((result) => result.dataValues);
            
            let empytToughts = false;

            if (toughts.length === 0) {
                empytToughts = true;
            }

            res.render('toughts/dashboard', { toughts, empytToughts });
        } catch (error) {
            console.error(' Erro ao exibir penamentos:', error);
            res.redirect('/');
        }
    }

    static async updateTought(req, res) {
        const id = req.params.id;

        const tought = await Tought.findOne( {where: { id: id }, raw: true } );

        res.render('toughts/edit', { tought });
    }
    
    static async updateToughtSave(req, res) {
        const {id, title} = req.body;

        if (!isNotEmpty(title)) {
            req.flash('message', 'Título inválido');
            res.render('toughts/edit');
            return;
        }
    
        const tought = {
            title: removeExcessSpaces(title)
        }

        try {
            await Tought.update(tought, { where: { id: id }} );

            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            });    
        } catch (error) {
            console.log(`Erro ao atualizar tought` + error);
        }
    }
}
