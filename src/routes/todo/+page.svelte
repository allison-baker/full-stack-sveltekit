<script lang="ts">
	import { createTodoStore } from './todos.ts';
	import TodoList from './TodoList.svelte';

	const todos = createTodoStore([
		{ done: false, description: 'write some docs' },
		{ done: false, description: 'start writing blog post' },
		{ done: true, description: 'buy some milk' },
		{ done: false, description: 'mow the lawn' },
		{ done: false, description: 'feed the turtle' },
		{ done: false, description: 'fix some bugs' }
	]);
</script>

<div class="max-w-[1200px] mx-auto">
	<h1 class="m-4 text-3xl uppercase pb-2 border-b-2 border-primary-600-300-token">Todo App</h1>
	<div class="grid grid-cols-2 gap-4 max-w-xl my-4 mx-auto">
		<input
			class="text-xl p-2 my-4 col-start-1 col-end-3 rounded-md variant-ghost-tertiary"
			placeholder="what needs to be done?"
			on:keydown={(e) => {
				if (e.key === 'Enter') {
					todos.add(e.currentTarget.value);
					e.currentTarget.value = '';
				}
			}}
		/>

		<div class="block">
			<h2 class="text-3xl font-light mb-4">todo</h2>
			<TodoList store={todos} done={false} />
		</div>

		<div class="block">
			<h2 class="text-3xl font-light mb-4">done</h2>
			<TodoList store={todos} done={true} />
		</div>
	</div>
</div>
