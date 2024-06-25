<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Laptop, Moon, Sun } from 'lucide-svelte';
	import { setMode, userPrefersMode } from 'mode-watcher';

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

<div class="flex h-16 items-center justify-between border-b px-5 md:px-20">
	<div class="flex items-center gap-4 md:gap-10">
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
			<DropdownMenu.Content class="w-fit" align="end">
				<DropdownMenu.Label class="flex justify-between gap-10 font-normal">
					<div class="flex flex-col space-y-1">
						<p class="text-sm font-medium leading-none">{user?.name}</p>
						<p class="text-xs leading-none text-muted-foreground">{user?.email}</p>
					</div>
					<div class="h-7 items-center gap-2 rounded-md border p-1 shadow">
						<fieldset
							role="group"
							data-orientation="horizontal"
							class="flex items-center justify-center gap-1"
						>
							<button
								on:click={() => setMode('light')}
								data-orientation="horizontal"
								data-state={$userPrefersMode === 'light' ? 'on' : 'off'}
								aria-checked={$userPrefersMode === 'light' ? true : false}
								role="radio"
								tabindex="0"
								data-melt-toggle-group-item=""
								data-toggle-group-item=""
								class="inline-flex h-[22px] w-[22px] items-center justify-center rounded-sm bg-transparent p-0 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
							>
								<Sun class="h-3.5 w-3.5" />
							</button>
							<button
								on:click={() => setMode('dark')}
								data-orientation="horizontal"
								data-state={$userPrefersMode === 'dark' ? 'on' : 'off'}
								aria-checked={$userPrefersMode === 'dark' ? true : false}
								role="radio"
								tabindex="-1"
								data-melt-toggle-group-item=""
								data-toggle-group-item=""
								class="inline-flex h-[22px] w-[22px] items-center justify-center rounded-sm bg-transparent p-0 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
							>
								<Moon class="h-3.5 w-3.5" />
							</button>
							<button
								on:click={() => setMode('system')}
								data-orientation="horizontal"
								data-state={$userPrefersMode === 'system' ? 'on' : 'off'}
								aria-checked={$userPrefersMode === 'system' ? true : false}
								role="radio"
								tabindex="-1"
								data-melt-toggle-group-item=""
								data-toggle-group-item=""
								class="inline-flex h-[22px] w-[22px] items-center justify-center rounded-sm bg-transparent p-0 text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
							>
								<Laptop class="h-3.5 w-3.5" />
							</button>
						</fieldset>
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
				<!-- <DropdownMenu.Item class="flex justify-between hover:!bg-inherit">
					Theme
					
				</DropdownMenu.Item> -->
				<form method="POST" action="/logout">
					<button type="submit" class="h-full w-full text-start">
						<DropdownMenu.Item
							class="hover:cursor-pointer hover:!bg-destructive hover:!text-destructive-foreground"
						>
							Log Out
						</DropdownMenu.Item>
					</button>
				</form>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
