<template>
    <div class="content fade-in mt-2">
        <Breadcrumb :home="home" :model="items">
            <template #item="{ item }">
                <a @click="redirect(item)" :class="item.class" class="custom-Breadcrumb">
                    <span v-if="item.icon" :class="item.icon"></span>
                    <span v-else>{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
        <Divider />
    </div>
    <div class="content">
        <h2 class="font-bold text-xl xl:text-2xl sm:text:sm">
            Nuevo usuario
        </h2>


        <div class="grid mt-5 mb-5">
            <span class="col-12 md:col-3 p-float-label">
                <InputText id="search_nombre" class="w-full" placeholder="Escriba su nombre"
                    v-model="querys[1].value" />
                <label for="search_nombre">Nombre(s)</label>
            </span>
            <span class="col-12 md:col-3 p-float-label">
                <InputText id="search_primer_apellido" class="w-full" placeholder="Escriba su primer apellido"
                    v-model="querys[1].value" />
                <label for="search_primer_apellido">Primer apellido</label>
            </span>
            <span class="col-12 md:col-3 p-float-label">
                <InputText id="search_segundo_apellido" class="w-full" placeholder="Escriba su segundo apellido"
                    v-model="querys[1].value" />
                <label for="search_segundo_apellido">Segundo apellido</label>
            </span>

        </div>
        
        <div class="grid mt-5 mb-5">
            <span class="col-12 md:col-3 p-float-label">
                <InputText id="search_correo" class="w-full" placeholder="Escriba su correo electronico"
                    v-model="querys[1].value" />
                <label for="search_correo">Correo electrónico</label>
            </span>
        </div>

        <div class="grid mt-5 mb-5">
            <span class="col-12 md:col-6">
                <Dropdown v-model="selectedStructure" :options="structures" optionLabel="name" placeholder="Estructura institucional" class="w-full" />
            </span>

            <span class="col-12 md:col-3 p-float-label">
                <InputText id="search_puesto" class="w-full" placeholder="Escriba el puesto"
                    v-model="querys[1].value" />
                <label for="search_puesto">Puesto</label>
            </span>
        </div>


        <hr class="custom-hr" />

        <div class="grid mt-5 mb-5">
            <span class="col-12 md:col-3">
                <Dropdown v-model="selectedStructure" :options="roles" optionLabel="name" placeholder="Tipo de rol" class="w-full" />
            </span>
        </div>

        <div>
            <h2 class="font-bold text-xl xl:text-2xl sm:text:sm">
                Permisos
            </h2>
            <p>Selecciona los permisos:</p>
        </div>
        <div class="grid  mt-5 mb-5">
            <TreeTable v-model:selectionKeys="selectedKey" :value="permissions" selectionMode="checkbox">
                <Column field="name" header="Name" expander></Column>
            </TreeTable>
        </div>

    </div>
</template>
<script>
export default {
    name: "provedores-page",
    emits: ['setNav'],
    data() {
        return {
            querys: [
                { param: 'pagina', value: 1 },
                { param: 'razon', value: null },
                { param: 'provedor', value: null },
            ],
            home: {
                icon: 'pi pi-home', path: "root/dashboard/inicio"
            },
            items: [
                { label: 'Inicio', path: "root/dashboard/inicio" },
                { label: 'Usuarios', path: "root/dashboard/usuarios-y-roles" },
                { label: 'Nuevo usuario' },
            ],
            provedor: {
                nombre: '', primer_apellido: '', segundo_apellido: '', correo: '', calle: '', n_ext: '', n_int: '', cp: '', estado: '', alcaldia_municipio: '', colonia: '', telefono: ''
            },
            selectedStructure: null,
            structures: [
                { name: 'Estructura1', code: '001' },
                { name: 'Estructura2', code: '002' },
                { name: 'Estructura3', code: '003' },
                { name: 'Estructura4', code: '004' },
                { name: 'Estructura5', code: '005' }
            ],
            selectedRol: null,
            roles: [
                { name: 'Admin', code: '001' },
                { name: 'Root', code: '002' },
                { name: 'Tesoreria', code: '003' },
            ],
            selectedKey: null,
            permissions: [
            {
                    key: '0',
                    data: {
                        name: 'Modulo 1',
                    },
                    children: [
                        {
                            key: '0-0',
                            data: {
                                name: 'Leer',
                            },
                        },
                        {
                            key: '0-1',
                            data: {
                                name: 'Editar',
                            }
                        },
                        {
                            key: '0-2',
                            data: {
                                name: 'Crear',
                            }
                        },
                        {
                            key: '0-3',
                            data: {
                                name: 'Borrar',
                            }
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        redirect(item) {
            if (item.path) {
                this.$store.commit('navActive', { path: item.path });
                this.$router.push({ path: item.path });
            }
        }
    }
}
</script>
<style></style>