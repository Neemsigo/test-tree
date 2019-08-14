/* eslint-disable no-console */
import Vue from 'vue';
import axios from 'axios';
import {
    FETCH_URL,
} from '@/store/modules/tree/const';

const state = {
    tree: {},
};

const getters = {
    'tree': state => state.tree,
};

const actions = {
    fetch({commit}) {
        return new Promise((resolve, reject) => {
            axios.get(FETCH_URL).then(async response => {
                if (response.status === 200) {
                    commit('fetched', response.data);
                    resolve(true);
                } else {
                    Vue.$log.error('fetch', response);
                    reject(response);
                }
            }).catch(error => {
                reject(error);
            });
        });
    }
};

const mutations = {
    fetched: (state, list) => {
        const childList = {}, //cashed list of child
              tree = {}; //result tree
        list.forEach(el => {
            if (el.parent_id === null) {
                tree[el.id] = el;
                return;
            }

            if (!childList[el.parent_id]) {
                childList[el.parent_id] = [];
            }

            childList[el.parent_id].push(el);
        })
        const addChilds = function(obj, key) {
            const childs = childList[key];
            obj._childs = childs ? childs.sort((first, second) => {return first.srt - second.srt}) : [];

            if (!childs) return;

            childs.forEach(el => {
                addChilds(el, el.id);
            })
        }
        for (let key in tree) {
            addChilds(tree[key], key);
        }

        state.tree = tree;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
