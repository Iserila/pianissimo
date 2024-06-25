<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';

	const NavItems = [
		{
			title: 'Sheets',
			href: '/app/sheets'
		},
		{
			title: 'Artists',
			href: '/app/artists'
		}
	];

	export let user;
</script>

<div class="flex h-16 items-center justify-between border-b px-20">
	<div class="flex items-center gap-10">
		<a href="/app/sheets">
			<img src="/images/logo.svg" alt="Pianissimo Logo" class="h-10" />
		</a>
		<nav class="flex items-center space-x-4 lg:space-x-6">
			{#each NavItems as item}
				{@const isActive = $page.url.pathname.startsWith(item.href)}
				<a
					href={item.href}
					class={cn(
						!isActive && 'text-muted-foreground',
						'text-sm font-medium capitalize transition-colors hover:text-primary'
					)}
				>
					{item.title}
				</a>
			{/each}
		</nav>
	</div>
	<div>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="ghost" builders={[builder]} class="relative h-10 w-10 rounded-full">
					<Avatar.Root class="h-10 w-10">
						<Avatar.Image
							src={pb.baseUrl +
								`/api/files/${user?.collectionName}/${user?.id}/${user?.avatar}?thumb=128x128`}
							alt={`@${user?.username}`}
						/>
						<Avatar.Fallback>
							{user?.name?.charAt(0)}
						</Avatar.Fallback>
					</Avatar.Root>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				<DropdownMenu.Label class="font-normal">
					<div class="flex flex-col space-y-1">
						<p class="text-sm font-medium leading-none">{user?.name}</p>
						<p class="text-xs leading-none text-muted-foreground">{user?.email}</p>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<!-- <DropdownMenu.Group>
					<DropdownMenu.Item href={`/users/${user?.username}`}>
						Profile
					</DropdownMenu.Item>
					<DropdownMenu.Item href="/settings">
						Settings
					</DropdownMenu.Item>
				</DropdownMenu.Group> -->
				<!-- <DropdownMenu.Separator />
				{#if user?.role === 'admin'}
					<DropdownMenu.Group>
						<DropdownMenu.Label>Admin</DropdownMenu.Label>
						<DropdownMenu.Item href="/admin/users">Users</DropdownMenu.Item>
						<DropdownMenu.Item href="/admin/invites">Invites</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
				{/if} -->
				<form method="POST" action="/logout">
					<button type="submit" class="h-full w-full text-start">
						<DropdownMenu.Item class="hover:!bg-destructive hover:!text-destructive-foreground hover:cursor-pointer">
							Log Out
						</DropdownMenu.Item>
					</button>
				</form>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
