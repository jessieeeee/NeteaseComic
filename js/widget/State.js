/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description :列表状态定义
 */
export default {
    Idle: 'Idle',               // 初始状态，无刷新的情况
    CanLoadMore: 'CanLoadMore', // 可以加载更多，还有数据可加载
    Loading: 'Loading',   // 正在刷新中
    NoMoreData: 'NoMoreData',   // 没有更多数据
    Failure: 'Failure'          // 刷新失败
}