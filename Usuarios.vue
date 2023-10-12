<template>

    <div class="card flex w-full">
        <form @submit="onSubmit" class="flex flex-column sm:flex-row justify-content-between w-full gap-2 ">
            <div class="flex gap-0 mb-3 sm:mb-0 ">
                <span class="p-float-label">
                    <InputText id="search_no_oficio" class="input-search" placeholder="Dato de usuario"
                        />
                    <label for="search_no_oficio">Buscar por nombre, correo...</label>
                </span>
                <Button icon="pi pi-search" />
            </div>
            
            <Button @click="this.$router.push({ path: '/root/dashboard/usuarios-y-roles/detalle'})" type="submit" label="Nuevo usuario" severity="secondary" />
        </form>
        <Toast />
    </div>

    <div class="mt-5">
        <div class="flex justify-content-end">
            <Button @click="changeView()" :icon="(layout == 'grid') ? 'pi pi-list' : 'pi pi-th-large'"
                severity="secondary" rounded></Button>
        </div>
        <DataView v-if="layout == 'grid'" paginator :rows="12" :value="users" :layout="layout">
            <template #grid="slotProps">
                <div class="col-12 sm:col-6 md:col-4 lg:col-3 p-1 mb-5">
                    <div class="border-1 surface-border surface-card border-round position-absolute">
                        <div class="header-title flex align-items-center justify-content-between surface-200">
                            <div class="p-3 flex align-items-start gap-1 flex-column">
                                <h1 class="font-semibold text-lg resize">
                                    {{ `${slotProps.data.name} 
                                        ${slotProps.data.lastName} 
                                        ${slotProps.data.secondLastName}` }}
                                </h1>
                                <strong class="text-lg xl:text-xl">| {{ slotProps.data.rol }}</strong>
                            </div>
                            <div class="align-self-start">
                                <Button icon="pi pi-ellipsis-v strong-icon" severity="danger" text rounded
                                    @click="openOptions($event, data)" aria-haspopup="true"
                                    aria-controls="ordenes_menu" />
                                <Menu style="width: 15.5rem;" :model="options" ref="menu" id="ordenes_menu"
                                    :popup="true">
                                    <template #item="{ item, label, props }">
                                        <a class="flex" v-bind="props.action">
                                            <span v-bind="props.icon" />
                                            <span v-bind="props.label">{{ label }}</span>
                                            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                                        </a>
                                    </template>
                                </Menu>
                            </div>
                        </div>

                        <div class="p-4 pb-0">
                            <div class="text-md">
                                <p v-tooltip="slotProps.data.email" class="text-ellipsis"><span class="font-bold pr-2">Correo:</span>{{ slotProps.data.email }}</p>
                                <p class="text-ellipsis"><span class="font-bold pr-2">Estructura:</span>{{ slotProps.data.email }}</p>
                            </div>
                        </div>

                        <div class="flex flex-column p-4">
                            <div class="w-80 mb-3">
                                <Tag :value="(slotProps.data.status) ? 'Activo' : 'Inactivo'" class="text-sm 2xl:w-3 w-5 "
                                    :severity="getStatusLabel(slotProps.data.status)" />
                            </div>
                            <div class="flex align-items-center gap-2">
                                <Button v-tooltip="'Click to proceed'" icon="pi pi-file-edit" severity="secondary" rounded
                                    :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
                                <span class="text-md font-semibold leyend-btn"> Editar</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
        <div v-else>
            <DataTable class="responsive-datatablet mt-5" removableSort ref="dt" stripedRows :value="users" dataKey="id"
                :paginator="true" :rows="10" :filters="filters">
                <Column field="name" header="Nombre(s)" sortable style="width: auto"></Column>
                <Column field="lastName" header="Primer apellido" sortable style="width: auto"></Column>
                <Column field="secondLastName" header="Segundo apellido" sortable style="width: auto"></Column>
                <Column field="email" header="Correo" sortable style="width: auto"></Column>
                <Column field="rol" header="Rol" sortable style="width: auto"></Column>
                <Column field="status" header="Estatus" sortable style="width: auto">
                    <template #body="slotProps">
                        <Tag 
                        :value="(slotProps.data.status? 'Activo' : 'Inactivo')" :severity="getStatusLabel(slotProps.data.status)" 
                        />
                    </template>
                </Column>
                <Column :exportable="false" style="width: auto">
                    <template #body="slotProps">
                        <Button icon="pi pi-ellipsis-v strong-icon" severity="danger" text rounded
                            @click="openOptions($event, slotProps.data)" aria-haspopup="true"
                            aria-controls="solicitudes_menu" />
                        <Menu style="width: 15.5rem;" :model="options" ref="menu" id="ordenes_menu" :popup="true">
                            <template #item="{ item, label, props }">
                                <a class="flex" v-bind="props.action">
                                    <span v-bind="props.icon" />
                                    <span v-bind="props.label">{{ label }}</span>
                                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                                </a>
                            </template>
                        </Menu>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>


</template>

<script>
// import { ProductService } from '@/service/ProductService';
export default {
    name: 'usuarios-page',
    components:{
    },
    data() {
        return {
            products: 
            [{
                id: '1000',
                code: 'f230fh0g3',
                name: 'Bamboo Watch',
                description: 'Product Description',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                quantity: 24,
                inventoryStatus: 'INSTOCK',
                rating: 5
            }],
            users:[
                 {
                    id: '1000',
                    name: 'Jose Roberto',
                    lastName: 'González',
                    secondLastName: 'Martínez',
                    email: 'jroberto@gmail.com',
                    rol: 'admin',
                    status: true
                },
                {
                    id: '1001',
                    name: 'Maria Fernanda',
                    lastName: 'López',
                    secondLastName: 'Pérez',
                    email: 'mfernanda@gmail.com',
                    rol: 'user',
                    status: true
                },
                {
                    id: '1002',
                    name: 'Carlos Alberto',
                    lastName: 'Hernández',
                    secondLastName: 'Sánchez',
                    email: 'calberto@gmail.com',
                    rol: 'admin',
                    status: false
                },
                {
                    id: '1003',
                    name: 'Ana Patricia',
                    lastName: 'Ramírez',
                    secondLastName: 'Díaz',
                    email: 'anapatricia@gmail.com',
                    rol: 'user',
                    status: false
                },
                {
                    id: '1004',
                    name: 'Javier',
                    lastName: 'Gutiérrez',
                    secondLastName: 'Vargas',
                    email: 'javier@gmail.com',
                    rol: 'admin',
                    status: true
                },
                {
                    id: '1005',
                    name: 'Alejandra',
                    lastName: 'Soto',
                    secondLastName: 'Hernández',
                    email: 'alejandra@gmail.com',
                    rol: 'user',
                    status: false
                },
                {
                    id: '1006',
                    name: 'Luis Alberto',
                    lastName: 'Ortega',
                    secondLastName: 'Martínez',
                    email: 'luis@gmail.com',
                    rol: 'admin',
                    status: true
                },
                {
                    id: '1007',
                    name: 'Verónica',
                    lastName: 'Gómez',
                    secondLastName: 'Castro',
                    email: 'veronica@gmail.com',
                    rol: 'user',
                    status: false
                },
                {
                    id: '1008',
                    name: 'Fernando',
                    lastName: 'Núñez',
                    secondLastName: 'Jiménez',
                    email: 'fernando@gmail.com',
                    rol: 'admin',
                    status: true
                },
                {
                    id: '1009',
                    name: 'Gabriela',
                    lastName: 'Torres',
                    secondLastName: 'Reyes',
                    email: 'gabriela@gmail.com',
                    rol: 'user',
                    status: true
                },
                {
                    id: '1010',
                    name: 'Jorge',
                    lastName: 'Díaz',
                    secondLastName: 'Mendoza',
                    email: 'jorge@gmail.com',
                    rol: 'admin',
                    status: true
                },
                {
                    id: '1011',
                    name: 'Carmen',
                    lastName: 'Moreno',
                    secondLastName: 'Silva',
                    email: 'carmen@gmail.com',
                    rol: 'user',
                    status: false
                },
                {
                    id: '1012',
                    name: 'Miguel Ángel',
                    lastName: 'García',
                    secondLastName: 'Luna',
                    email: 'miguel@gmail.com',
                    rol: 'admin',
                    status: false
                },
                {
                    id: '1013',
                    name: 'Patricia',
                    lastName: 'Vázquez',
                    secondLastName: 'Ríos',
                    email: 'patricia@gmail.com',
                    rol: 'user',
                    status: true
                },
                {
                    id: '1014',
                    name: 'Roberto',
                    lastName: 'Herrera',
                    secondLastName: 'Santos',
                    email: 'roberto@gmail.com',
                    rol: 'admin',
                    status: true
                }
            ],
            layout: 'grid',
            options: [
                {
                    label: "Editar usuario",
                    icon: "pi pi-eye",
                    command: () => {
                        console.log("Editar usuario");
                    },
                },
                {
                    label: "Activar/Desactivar usuario",
                    icon: "pi pi-eye",
                    command: () => {
                        console.log("Activar/Desactivar usuario");
                    },
                },
            ],
            maxHeight:0,
        }
    },
    mounted() {
        this.maxHeightMethod();
        window.addEventListener('resize', this.maxHeightMethod );
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.maxHeightMethod);
    },
    methods: {
        maxHeightMethod() {
            let headers = document.querySelectorAll('.resize');
            headers.forEach(header => header.style.height = 'auto');
            this.maxHeight = Math.max(...Array.from(headers).map(header => header.offsetHeight));
            headers.forEach(header => header.style.height = `${this.maxHeight}px`);
        },
        getSeverity(product) {
            switch (product.inventoryStatus) {
                case 'INSTOCK':
                    return 'success';

                case 'LOWSTOCK':
                    return 'warning';

                case 'OUTOFSTOCK':
                    return 'danger';

                default:
                    return null;
            }
        },
        getStatusLabel(status) {
            switch (status) {
                case true:
                    return 'success';

                case false:
                    return 'secondary';

                default:
                    return null;
            }
        },
        // TODO: Asignar las vistas por opción
        // openOptions(event, data) {
        openOptions(event) {
            // this.selected_item = data;
            this.$refs.menu.toggle(event);
            
        },
        changeView() {
            this.layout == 'grid' ? this.layout= 'list' : this.layout = 'grid';
            setTimeout(() => this.maxHeightMethod(), 10);
        }
    }
}
</script>

<style scoped>
.text-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


</style>