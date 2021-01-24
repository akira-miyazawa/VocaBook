import { mount, shallowMount, config } from '@vue/test-utils';
import Login from '@/views/Login.vue';
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterComponent.vue';
import ElementUI from 'element-plus';

describe("Login.vue", () => {

  it('タイトルが表示されている', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [ElementUI]
      }
    });
    expect(wrapper.find('h1').text()).toBe('VocaBook');
  });
  it('ログインボタンが表示されている', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [ElementUI]
      }
    });
    const button = wrapper.find('button');
    expect(button).not.toBeNull();
    expect(button.text()).toBe('ログイン');
  })
  it('ラジオボタンが表示されて表示されている', () => {
    const wrapper = mount(Login, {
      global: {
        plugins: [ElementUI]
      }
    });
    const radios = wrapper.findAll('input');
    expect(radios).not.toBeNull();
    expect(radios[0].element.checked).toBe(true);
    expect(radios[1].element.checked).toBe(false);
  });
  it('子コンポーネントの表示', () => {
    const wrapper = shallowMount(Login, {
      global: {
        plugins: [ElementUI]
      }
    })
    // 画面表示デフォルト
    expect(wrapper.findComponent(LoginComponent).exists()).toBe(true);
    expect(wrapper.findComponent(RegisterComponent).exists()).toBe(false);
  });
});