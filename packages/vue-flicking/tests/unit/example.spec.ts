import HelloWorld from "@/components/HelloWorld.vue";
import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
