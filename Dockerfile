# 设置基础镜像
FROM nginx
# 将dist文件中的内容复制到nginx这个目录下面
COPY dist/  /usr/nginx/www/
#用本地的 default.conf 配置来替换nginx镜像里的默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf