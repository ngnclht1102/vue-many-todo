import Vue from 'vue';
import { shallow } from 'vue-test-utils';
import Todo from '@/components/Todo';

const unitestData = {
  data: {
    tasks: [
      {
        id: 1535892766,
        title: 'The first one',
        done: false,
      },
      {
        id: 1535892769,
        title: 'The third one',
        done: false,
      },
      {
        id: 1535892767,
        title: 'The second one',
        done: true,
      },
    ]
  }
}


describe('Todo.vue', () => {

  it('Should render correct on init', () => {
    const wrapper = shallow(Todo, unitestData);
    // remaining task has 1 item only
    expect(Object.keys(wrapper.find('#remaining-tasks-container').element.children).length)
      .toEqual(2);
    // done task has 1 item only
    expect(Object.keys(wrapper.find('#done-tasks-container').element.children).length)
      .toEqual(1);
  });

  it('Should mark undone task as done', () => {
    const wrapper = shallow(Todo, unitestData);
    // mark a todo as done
    wrapper.find('#remaining-tasks-container div input').trigger('click');
    // check if remaining task has 1 item currently
    expect(Object.keys(wrapper.find('#remaining-tasks-container').element.children).length)
      .toEqual(1);
    // check if done task has 2 item now
    expect(Object.keys(wrapper.find('#done-tasks-container').element.children).length)
      .toEqual(2);
  });

  it('Can add new task', () => {
    const new_task_title = 'hello guy';
    const wrapper = shallow(Todo, {
      data: {
        tasks: [],
        rawInput: new_task_title
      }
    });
    // add new task
    wrapper.find('#add_button').trigger('click');
    // check if added successfully
    expect(Object.keys(wrapper.find('#remaining-tasks-container').element.children).length)
      .toEqual(1);
  });

  it('Should show message when no done task or no remaining task', () => {
    const new_task_title = 'hello guy';
    const wrapper = shallow(Todo, {
      data: {
        tasks: [
        ],
      }
    });
    wrapper.findAll('.message');
    // check if we have 2 message
    expect(wrapper.findAll('.message').wrappers.length)
      .toEqual(2);
  });

  it('Can\'t add task with empty title', () => {
    const new_task_title = 'hello guy';
    const wrapper = shallow(Todo, {
      data: {
        tasks: [
        ],
      }
    });
    // add new task without title
    wrapper.find('#add_button').trigger('click');
    // check if we have message error
    // console.log(wrapper.find('.error'));
    expect(Object.keys(wrapper.find('#remaining-tasks-container').element.children).length)
      .toEqual(0);
    expect(wrapper.vm.validatingResult.valid)
      .toEqual(false);
  });

  it('Should remove the error text when start typing', () => {
    const new_task_title = 'hello guy';
    const wrapper = shallow(Todo, {
      data: {
        rawInput: ""
      }
    });
    // generate the error
    wrapper.find('#add_button').trigger('click');
    wrapper.setData({ rawInput: "start typing" });
    expect(wrapper.find('.error').exists()).toBe(false)
    expect(wrapper.vm.validatingResult.valid)
      .toEqual(true);
  });

});
