<template>
    <div>
        <div class="card-page booking-list">
            <bread-crumbs :items="breadcrumbs"/>
            <h1>Questions & Answers</h1>
            <div class="content">
                <div class="search-create-block">
                    <div class="search-input-container">
                        <input
                                class="search-input"
                                placeholder="Search"
                        />
                        <svg-icon class="search-icon" name="search"></svg-icon>
                    </div>
                    <datepicker class="left-picker"></datepicker>
                    <datepicker vclass="right-vdp"></datepicker>
                </div>
                <div class="questions-sort">
                    <div class="questions-sort-title">Sort by:</div>
                    <div class="questions-sort-item questions-sort-active">Tour name</div>
                    <div class="questions-sort-item">Date</div>
                </div>
                <div class="review-wrap">
                    <div class="review">
                        <div class="review-contact">
                            <div class="review-contact-photo">
                                <svg-icon name="review-icon"></svg-icon>
                            </div>
                            <div class="review-contact-name">Name Surname</div>
                            <a href="#" class="review-contact-mail">email@gmail.com</a>
                            <a href="#" class="review-contact-tel">+79250551311</a>
                        </div>
                        <div class="review-info">
                            <div class="review-date">Wed, Oct 9, 2019</div>
                            <div class="review-info-title">Petra 2-Day Tour from Tel-Aviv</div>
                            <div class="review-info-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Accusantium, saepe, iste. Veniam dolorem, non obcaecati incidunt recusandae, aperiam
                                molestias odio ut repellat dolore tenetur ducimus vero inventore maxime expedita labore.
                            </div>
                            <div class="review-info-show">Show all
                                <svg-icon name="arrow-down-blue"></svg-icon>
                            </div>
                            <button class="review-info-btn">Respond</button>
                        </div>
                    </div>
                    <div class="review">
                        <div class="review-contact">
                            <div class="review-contact-photo">
                                <svg-icon name="review-icon"></svg-icon>
                            </div>
                            <div class="review-contact-name">Name Surname</div>
                            <a href="#" class="review-contact-mail">email@gmail.com</a>
                            <a href="#" class="review-contact-tel">+79250551311</a>
                        </div>
                        <div class="review-info">
                            <div class="review-date">Wed, Oct 9, 2019</div>
                            <div class="review-info-title">Petra 2-Day Tour from Tel-Aviv</div>
                            <div class="review-info-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Accusantium, saepe, iste. Veniam dolorem, non obcaecati incidunt recusandae, aperiam
                                molestias odio ut repellat dolore tenetur ducimus vero inventore maxime expedita labore.
                            </div>
                            <div class="review-response">
                                <div class="review-response-edit">
                                    <svg-icon name="pancil"></svg-icon>
                                </div>
                                <div class="review-response-title">Response</div>
                                <div class="review-response-item">
                                    <div class="review-response-left">
                                        <div class="review-response-photo">
                                            <!--                                            <img src="img/review-white.svg" alt="review">-->
                                        </div>
                                    </div>
                                    <div class="review-response-info">
                                        <div class="review-response-top">
                                            <span class="review-response-name">Anna M,</span>
                                            <span class="review-response-date">Wed, Oct 9, 2019</span>
                                        </div>
                                        <div class="review-response-text">Lorem ipsum dolor sit amet, consectetur
                                            adipisicing elit. Dicta nihil molestias ad totam rem inventore architecto
                                            cupiditate aut. Ex, natus.
                                        </div>
                                    </div>
                                </div>
                                <div class="review-active">
                                    <div class="review-active-title">Active:</div>
                                    <label class="review-active-switch">
                                        <input class="review-active-input" type="checkbox"/>
                                        <span class="review-active-label" data-on="On" data-off="Off"></span>
                                        <span class="review-active-handle"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="review">
                        <div class="review-contact">
                            <div class="review-contact-photo">
                                <svg-icon name="review-icon"></svg-icon>
                            </div>
                            <div class="review-contact-name">Name Surname</div>
                            <a href="#" class="review-contact-mail">email@gmail.com</a>
                            <a href="#" class="review-contact-tel">+79250551311</a>
                        </div>
                        <div class="review-info">
                            <div class="review-date">Wed, Oct 9, 2019</div>
                            <div class="review-info-title">Petra 2-Day Tour from Tel-Aviv</div>
                            <div class="review-info-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Accusantium, saepe, iste. Veniam dolorem, non obcaecati incidunt recusandae, aperiam
                                molestias odio ut repellat dolore tenetur ducimus vero inventore maxime expedita labore.
                            </div>
                            <div class="review-response">
                                <div class="review-response-title">Response</div>
                                <textarea class="review-response-field"
                                          placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam neque dolorem architecto, saepe impedit ea hic a ipsum vel cum!"></textarea>
                            </div>
                            <div class="review-response-send">
                                <div class="review-response-done">Done</div>
                                <div class="review-response-cancel">Cancel</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="questions-nav">
                <div class="questions-nav-item questions-nav-left">
                    <svg-icon name="arrow-left"></svg-icon>
                </div>
                <div class="questions-nav-item questions-nav-active">1</div>
                <div class="questions-nav-item">2</div>
                <div class="questions-nav-item">...</div>
                <div class="questions-nav-item">10</div>
                <div class="questions-nav-item questions-nav-right">
                    <svg-icon name="arrow-right"></svg-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import SvgIcon from "../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";

    export default {
        name: "Question",
        components: {Datepicker, SvgIcon},
        data: () => ({
            breadcrumbs: [
                {pathname: "dashboard", title: 'Home'},
                {pathname: "question-index", title: 'Question and answers'}
            ],
        })
    }
</script>


