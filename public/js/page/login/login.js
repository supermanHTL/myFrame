/** 2017-12-18 11:09:08
 *作者:htl
 *功能:
 */

import '../../../style/login/login.scss'
import {http} from '../../../js/common/util'
import axios from 'axios'
new Vue({
    el: '#app',
    data() {
        return {
            userName: '',
            password: '',
        }
    },
    methods: {
        submit() {
            const _this = this;
            axios.post('/login/putLogin',{
                loginName: _this.userName,
                password: _this.password
            }).then(function(data) {
                console.log(data);
            }).catch((err) => {
                console.log(err)
            })
        }
    }
})