<template>
    <div class="notfound">
        <div class="d-flex h-100 flex-column align-items-center justify-content-center text-center">
            <img :src="Logo" alt="">
            <span>404</span>
        </div>
    </div>
</template>

<script>
import Logo from '@/assets/images/logo.png';
export default {
    name:'NotFound',
    data(){
        return{
            Logo:Logo
        }
    }
}
</script>