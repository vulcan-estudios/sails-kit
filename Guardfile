#LIVERELOAD

puts "Welcome!"

guard 'livereload' do

    ignore %r{^assets/}

    #LiveReload
    watch(%r{.tmp/public/.+\.(css|js)})
    watch(%r{views/.+\.(js|ejs|html)})

end