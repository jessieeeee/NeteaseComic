/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :列表尾部加载更多状态
 */
export default {
    Idle: 'Idle',               // 初始状态，无刷新的情况
    CanLoadMore: 'CanLoadMore', // 可以加载更多，还有数据可加载
    Loading: 'Loading',   　　　// 正在加载中
    NoMoreData: 'NoMoreData',   // 没有更多数据
    Failure: 'Failure'          // 加载失败
}