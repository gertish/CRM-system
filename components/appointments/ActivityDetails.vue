<template>
    <div class="activity-details">
        <div class="activity-details__overview">
            <div class="activity-details__thumbnail">
                <img src="@/assets/icons/DefaultImg.svg" alt="">
                <div class="activity-details__info">
                    <h3>1824 Turkey Pen Road</h3>
                    <p>Cleveland, OH 12345</p>
                </div>
            </div>
            <div class="activity-details__status">
                <button class="">IN PROGRESS</button>
                <img src="@/assets/icons/Arrow-right.svg" alt="">
            </div>
        </div>
        <div class="activity-details__content">
            <div class="activity-details__content-item">
                <img src="@/assets/icons/Embedded.svg" alt="">
                <div class="activity-details__info">
                    <span>17 Nov 2021</span>
                    <p>
                        Installation of the new air conditioning system
                    </p>
                </div>
            </div>
            <div class="activity-details__content-item">
                <img src="@/assets/icons/Embedded.svg" alt="">
                <div class="activity-details__info">
                    <span>17 Nov 2021</span>
                    <p>
                        Installation of the new air conditioning system
                    </p>
                </div>
            </div>
            <div class="activity-details__load-btn">
                <button>Load more</button>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>

</script>


<style lang="scss">
.activity-details {
    width: 519px;
    background-color: #fff;
    box-shadow: 0 0 0 1.5px #eaeef4;
    border: none;
    border-radius: 12px;


    .activity-details__content {
        margin-top: 18px;
        padding: 10px 18px 0 18px;

        .activity-details__content-item {
            display: flex;
            gap: 15px;
            line-height: 25px;

            span {
                font-weight: 400;
                color: #7e92a2;
            }

            p {
                color: #092c4c;
            }



            &:not(:first-child) {
                margin-top: 18px;
            }
        }

        .activity-details__load-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 26px;

            button {
                border: none;
                background-color: #fff;
                color: #514ef3;
                font-size: 17px;
                font-weight: 700;
                cursor: pointer;
            }
        }
    }


    .activity-details__overview {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px #e6e9f0 solid;
        padding: 16px 24px 0px 24px;


        .activity-details__status {
            display: flex;
            gap: 15px;

            button {
                border: none;
                border-radius: 100px;
                padding: 10px 20px;
                background-color: #ececfe;
                color: #514ef3;
                cursor: pointer;
            }
        }


        .activity-details__thumbnail {
            display: flex;
            margin-bottom: 16px;
            line-height: 30px;
            gap: 15px;

            .activity-details__info {
                h3 {
                    color: #092c4c;
                }

                p {
                    font-weight: 400;
                    color: #7e92a2;
                }
            }
        }
    }
}
</style>