import { expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import plugin from "../../src/index";
import { PluginAddFunction } from "../../types";

describe("Plugin", () => {
  it("should be 2", () => {
    const msg = "new message";
    const localVue = createLocalVue();
    localVue.use(plugin);
    const wrapper = shallowMount(HelloWorld, {
      localVue,
      propsData: { msg },
    });
    expect(wrapper.vm.$add(1, 1)).to.equal(2);
  });
});
