import Vue from 'vue'
import Login from '@/components/pages/Login'

describe('Login.vue', () => {
    let _login = null;
    beforeEach(()=>{
        const container = document.createElement('div');
        const loginComponent = Vue.extend(Login);
        _login = new loginComponent();
        _login.$mount(container);
    })
    it('should list inputs', () => {
        expect(_login.username).to.equal('')
        expect(_login.$el.querySelectorAll('input').length).to.equal(2)
        expect(_login.$el.getElementsByTagName('input')[0].getAttribute('type')).to.equal('text')
    })
})