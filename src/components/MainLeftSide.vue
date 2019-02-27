<template>
    <div class="main__leftside">
        <a href="/">
            <img class="logo d-block mx-auto" :src="LogoImg" alt="">
        </a>

        <div class="main__menuwrapper">
            <ul class="main__menulist text-center">
                <li>
                    <a href="#" class="clr-f4 size-18">
                        <i class="fas fa-server"></i>
                        <span class="d-block rb-font rb-400 size-12">Sunucular</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="clr-f4 size-18">
                        <i class="fas fa-project-diagram"></i>
                        <span class="d-block rb-font rb-400 size-12">Bilgiler</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="clr-f4 size-18">
                        <i class="fas fa-key"></i>
                        <span class="d-block rb-font rb-400 size-12">Şifre oluştur</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import LogoImg from '@/assets/images/logo.png';

export default {
    name:'MainLeftSide',
    data() {
        return {
            LogoImg:LogoImg
        }
    },
}
</script>