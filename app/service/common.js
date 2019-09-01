const Service = require('egg').Service;
class CommonService extends Service {
    /**
     * 根据用户id查询角色
     * @param {Int} user_id 
     */
    async roles(user_id) {
        const { app } = this;
        return await app.mysql.query(`SELECT r.* FROM reg_user_role ur, reg_role r WHERE  r.role_id = ur.role_id and ur.user_id = ?`, [user_id]);
    }
    /**
     * 根据角色查询页面导航及权限
     * @param {String} role_id 
     */
    async navs(role_id) {
        const { app } = this;
        let result =  await app.mysql.query(`SELECT DISTINCT
                po.page_code, po.oper_code, o.oper_name, p.*, n.*
            FROM
                reg_role_auth ra,
                reg_page_oper po
                    LEFT JOIN
                reg_oper o ON o.oper_code = po.oper_code
                    LEFT JOIN
                reg_page p ON p.page_code = po.page_code
                    LEFT JOIN 
                reg_navigation n ON n.nav_code = p.nav_code
            WHERE
                ra.auth_id = po.page_oper_id
                    AND ra.role_id IN (?)`, [role_id]);
        let navs = [];
        for(var item of result){
            let {page_code, oper_code, oper_name, title, page_router, nav_code, nav_name} = item;
            let curnav = navs.find(n=>n.nav_code === nav_code);
            curnav || (curnav={nav_code, nav_name, pages: []},navs.push(curnav));
            let curpage = curnav.pages.find(p=>p.page_code===page_code);
            curpage || (curpage={page_code, title, page_router,opers:[]},curnav.pages.push(curpage));
            curpage.opers.push({oper_code, oper_name});
        }
        return navs;
    }
}
module.exports = CommonService