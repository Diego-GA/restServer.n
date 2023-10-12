<template>

    <div class="content fade-in  mt-2">
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
        <TabView v-model:activeIndex="active">
            <TabPanel>
                <template #header>
                    <span>Usuarios</span>
                </template>
                <Usuarios />
            </TabPanel>
            <TabPanel>
                <template #header>
                    <span>Roles y permisos</span>
                </template>
                <RolesYPermisos />
            </TabPanel>
        </TabView>
    </div>
</template>
<script>
import Usuarios from '@/components/UsuariosYRoles/Usuarios.vue';
// import SolicitudesPago from '@/components/Pagos/Solicitudes-pago.vue';
import RolesYPermisos from '@/components/UsuariosYRoles/RolesYPermisos.vue';

export default {
    name: "usuarios-y-roles",
    emits: ['setNav'],
    components: { Usuarios, RolesYPermisos },
    data() {
        return {
            active: 0,
            home: { icon: 'pi pi-home', path: "/dashboard/inicio" },
            items: [
                {
                    label: 'Inicio',
                    path: "/dashboard/inicio"
                },
                {
                    label: 'Mis ordenes de pago'
                },
            ],
            home: {
                icon: 'pi pi-home', path: "/root/dashboard/inicio"
            },
            items: [
                {
                    label: 'Inicio', path: "root//dashboard/inicio"
                },
                {
                    label: 'Usuarios'
                },
            ],
        };
    },
    methods: {
        redirect(item) {
            if (item.path) {
                this.$router.push({ path: item.path });
                this.$emit('setNav', item.path);
            }
        }
    },
    watch: {
        async active() {
            this.items[1].label = (this.active == 0) ? 'Usuarios' : 'Roles y permisos';
        }
    }
}
</script> 