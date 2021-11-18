window.onload = taskFunction;

function taskFunction() {
    var tasker = {
        init: function(){
            this.cacheDom();
            this.bindEvents();
            this.evalTasklist();
        },
        cacheDom: function(){
            this.taskInput = document.getElementById("task-input");
            this.addBtn = document.getElementById("add-task");
            this.tasksList = document.getElementById("tasks");
            this.tasksListChildren = this.tasksList.children;
            this.errorText = document.getElementById("error");
        },
        bindEvents: function(){
            this.addBtn.onclick = this.addTask.bind(this);
            this.taskInput.onkeypress = this.enterKey.bind(this);
        },
        evalTasklist: function(i){
            var i, checkbox, delBtn;

            for(i = 0; i < this.tasksListChildren.length; i++) {
                checkbox = this.tasksListChildren[i].getElementsByTagName("input")[0];

                checkbox.onclick = this.completeTask.bind(this, this.tasksListChildren[i], checkbox);

                delBtn = this.tasksListChildren[i].getElementsByTagName("button")[0];

                delBtn.onclick = this.delTask.bind(this, i)
            }
        },
        render: function(){
            var taskLi,
                taskCheckbox,
                taskVal,
                taskBtn,
                taskTrash,
                taskNum;

            taskLi = document.createElement("li");
            taskLi.setAttribute("class", "task");

            taskCheckbox = document.createElement("input");
            taskCheckbox.setAttribute("type", "checkbox");

            taskLabel = document.createElement("label");
            taskLabel.setAttribute("id", "to-do");
            taskVal = document.createTextNode(this.taskInput.value);
            taskLabel.appendChild(taskVal);

            taskBtn = document.createElement("button");
            taskTrash = document.createElement("i");
            taskTrash.setAttribute("class", "fas fa-trash-alt");

            taskBtn.appendChild(taskTrash);

            taskLi.appendChild(taskCheckbox);
            taskLi.appendChild(taskLabel);
            taskLi.appendChild(taskBtn);

            this.tasksList.appendChild(taskLi);
        },
        completeTask: function(i, checkbox){
            if(checkbox.checked) {
                i.className = "task completed";
            } else {
                i.className = this.incompleteTask(i);
            }
        },
        incompleteTask: function(i){
            i.className = "task"
        },
        enterKey: function(event){
            if(event.keyCode === 13 || event.which === 13) {
                this.addTask();
            }
        },
        addTask: function(){
            var value = this.taskInput.value;
            this.errorText.style.display = "none";
            if(value === "") {
                this.error();
            } else {
                this.render();
                this.taskInput.value = "";
                this.evalTasklist();
            }
        },
        delTask: function(i){
            this.tasksList.children[i].remove();
            this.evalTasklist();
        },
        error: function(){
            this.errorText.style.display = "block";
        }
    };

    tasker.init();
}

