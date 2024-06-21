<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';

	console.log($currentUser);

	const NavItems = [
		{
			title: 'Sheets',
			href: '/sheets'
		},
		{
			title: 'Artists',
			href: '/artists'
		}
	];

	function logOut() {
		pb.authStore.clear();
	}
</script>

<div class="flex h-16 items-center justify-between border-b px-20">
	<div class="flex items-center gap-10">
		<a href="/sheets">
			<img src="/images/logo.svg" alt="Pianissimo Logo" class="h-10" />
		</a>
		<nav class="flex items-center space-x-4 lg:space-x-6">
			{#each NavItems as item}
				{@const isActive = $page.url.pathname === item.href}
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
								`/api/files/${$currentUser?.collectionName}/${$currentUser?.id}/${$currentUser?.avatar}?thumb=128x128`}
							alt={`@${$currentUser?.username}`}
						/>
						<Avatar.Fallback>
							{$currentUser?.name[0]}
						</Avatar.Fallback>
					</Avatar.Root>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				<DropdownMenu.Label class="font-normal">
					<div class="flex flex-col space-y-1">
						<p class="text-sm font-medium leading-none">{$currentUser?.name}</p>
						<p class="text-xs leading-none text-muted-foreground">{$currentUser?.email}</p>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<!-- <DropdownMenu.Item href={`/users/${$currentUser?.username}`}>
						Profile
					</DropdownMenu.Item> -->
					<DropdownMenu.Item href="/settings">
						Settings
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<!-- <DropdownMenu.Separator />
				{#if $currentUser?.role === 'admin'}
					<DropdownMenu.Group>
						<DropdownMenu.Label>Admin</DropdownMenu.Label>
						<DropdownMenu.Item href="/admin/users">Users</DropdownMenu.Item>
						<DropdownMenu.Item href="/admin/invites">Invites</DropdownMenu.Item>
					</DropdownMenu.Group>
					<DropdownMenu.Separator />
				{/if} -->
				<DropdownMenu.Item
					class="hover:!bg-destructive hover:!text-destructive-foreground"
					on:click={logOut}
				>
					Log Out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
