const Service = require('egg').Service;
class CommonService extends Service {
    /**
     * 根据用户id查询角色
     * @param {Int} user_id 
     */
    async roles(user_id) {
        const { app } = this;
        return await app.mysql.query(`SELECT 
                    r.*
                FROM
                    reg_user_role ur,
                    reg_role r
                WHERE
                    r.role_id = ur.role_id
                        AND ur.user_id = ?`, [user_id]);
    }
    /**
     * 根据角色查询页面导航及权限
     * @param {String} role_id 
     */
    async navs(role_id) {
        const { app } = this;
        let pages =  await app.mysql.query(`SELECT DISTINCT
                p.page_id,
                p.page_code,
                p.title,
                p.page_router,
                n.nav_name,
                n.nav_code
            FROM
                reg_role_permission rp,
                reg_page p
                    LEFT JOIN
                reg_navigation n ON n.nav_code = p.nav_code
            WHERE
                rp.permission_id = p.page_code
                    AND rp.permission_type = 'page'
                    AND rp.role_id IN (?)`, [role_id]);
        let roles =  await app.mysql.query(`SELECT DISTINCT
                o.oper_id, o.*
            FROM
                reg_role_permission rp,
                reg_oper o
            WHERE
                rp.permission_id = o.oper_code
                    AND rp.permission_type = 'oper'
                    AND rp.role_id IN (?)`, [role_id]);
        
        let navs = [];
        for(var item of pages){
            let {page_code, title, page_router, nav_code, nav_name} = item;
            let curnav = navs.find(n=>n.nav_code === nav_code);
            let opers = roles.filter(role=>role.page_code === page_code);
            curnav || (curnav={nav_code, nav_name, pages: []},navs.push(curnav));
            curnav.pages.push({page_code, title, page_router, opers});
        }
        return navs;
    }
}
module.exports = CommonService