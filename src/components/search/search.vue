<template>
  <div class="searchbox">
  	<scroll :data="songs" class="search-wrapper" ref="search">
	    <div class="search">
	    	<input type="text" v-model="val" placeholder="请输入你想要的歌曲">
	    	<button @click="search">搜索</button>
	    </div>
	    <div class="search-list" ref="searchList">
	    	<song-list @select="selectItem" :songs="songs"></song-list>	
	    </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSearch} from 'api/search'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import {getSongKey} from 'api/recommend'
import SongList from 'base/song-list/song-list'
import {mapActions} from 'vuex'
import Scroll from 'base/scroll/scroll'
import {playlistMixin} from 'common/js/mixin'
export default{
  mixins: [playlistMixin],
  data () {
    return {
      val: '',
      songs: []
    }
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.searchList.style.bottom = bottom
      this.$refs.search.refresh()
    },
    search () {
      if (this.val === '') {
      } else {
        getSearch(this.val).then((res) => {
          let ret = res.data
          let data = ret.substring(34, ret.length - 1)
          let newdata = JSON.parse(data)
          if (newdata.code === ERR_OK) {
            console.log(newdata.data.song.list)
            this.songs = this._normalizeSongs(newdata.data.song.list)
            this.$refs.search.refresh()
          }
        })
      }
    },
    _normalizeSongs (list) {
      let rets = []
      list.forEach((musicData) => {
        console.log(musicData)
        if (musicData.album) {
          var obj = {
            songid: musicData.album.id,
            songmid: musicData.mid,
            singer: musicData.singer,
            songname: musicData.name,
            interval: musicData.interval,
            albummid: musicData.album.mid,
            albumname: musicData.name
          }
          getSongKey(musicData.mid).then((res) => {
            rets.push(createSong(Object.assign(obj, {vkey: res.data.items[0].vkey})))
          })
        }
      })
      return rets
    },
    selectItem (item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'selectPlay'
    ])
  },
  components: {
    SongList, Scroll
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.searchbox
	position: fixed
	width: 100%
	top: 88px
	bottom: 0
	.search-wrapper
		height: 100%
		overflow: hidden
		.search
			display: flex
			align-items: center
			justify-content: center
			font-size: 0.7rem
			input
				border:none
				outline:none
				padding: 10px
				border-radius:5px
				margin-right: 8px
			button
				border:none
				outline:none
				padding: 10px
				border-radius:5px
				background-color:#31c27c
				color:#fff
		.search-list
			margin-left: 10px
</style>
