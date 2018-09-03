<template>
  <div class='hello'>
    <h1>Todo App</h1>

    <input type="text" v-model="rawInput" placeholder="Create new todo" />
    <input id="add_button" v-on:click="createNew" type="button" value="Add" />
    <p class="error" v-if="!validatingResult.valid">{{ validatingResult.message }}<p>
    <h2>Remaining</h2>
    <p class="message" v-if="remainingTask.length == 0">No remaining tasks</p>
    <div id="remaining-tasks-container">
      <div v-for="task in remainingTask" :key="task.id" >
        <span class="todo_title" v-bind:class="{ todo_title_done: task.done }">{{task.title}}</span>
        <input type="checkbox" v-model="task.done" />
      </div>
    </div>

    <h2>Done</h2>
    <p class="message" v-if="doneTask.length == 0">There are no done tasks</p>
    <div id="done-tasks-container">
      <div v-for="task in doneTask" :key="task.id">
          <span class="todo_title" v-bind:class="{ todo_title_done: task.done }">
            {{ task.title }}
          </span>
          <input type="checkbox" v-model="task.done" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Todo',
  computed: {
    remainingTask() {
      const remainingTask = this.tasks.filter(i => !i.done);
      return remainingTask;
    },
    doneTask() {
      return this.tasks.filter(i => i.done);
    },
  },
  watch: {
    rawInput: function(oldText, newText) {
      this.validatingResult.valid =  true
    }
  },
  methods: {
    createNew() {
      if (!this.rawInput) {
        this.validatingResult.valid = false;
        return
      }
      this.tasks.push({
        id: new Date().getTime(),
        title: this.rawInput,
        done: false
      })
    }
  },
  data() {
    return {
      rawInput: "",
      validatingResult: {
        valid: true,
        message: "Please enter the title of the task"
      },
      tasks: [
        {
          id: 1535892766,
          title: 'Go out and buy snack',
          done: false,
        },
        {
          id: 1535892767,
          title: 'Play PS4 with friends',
          done: true,
        },
      ],
    };
  },

};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.todo_title_done {
  text-decoration: line-through;
}
.error {
  color: red
}
</style>
