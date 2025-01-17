/*middleware.js*/
export function middleware(request) {
  const slug = request.nextUrl.pathname.slice(1).split('/');
  //Robust Validation
  if (!slug || slug.length < 2 || !slug[1]) {
    return NextResponse.redirect(new URL('/', request.url)); 
  }

  const productId = slug[1];
  const action = slug[2];
  try {
    // Perform actions based on validated segments
    console.log('Product ID:', productId);
    console.log('Action:', action); 

    //Further logic based on validated parameters
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.rewrite(new URL('/error', request.url));
  }
}
export const config = {
  matcher: '/product/:path*' //Adjust matcher to your need
};

/*middlewareSolution.js*/
export function middleware(request) {
  const url = request.nextUrl.clone();
  const slug = request.nextUrl.pathname.slice(1).split('/');
  //Improved validation and handling of nested segments
  if (!slug || slug.length < 2) {
    return NextResponse.rewrite(new URL('/404', request.url)); //Handle invalid routes
  }
  const productId = slug[1];
  const action = slug[2];
  if (!/^[0-9]+$/.test(productId)) {
    return NextResponse.rewrite(new URL('/error', request.url)); //Invalid product ID
  }
  // ... more validation and handling of the action parameter
  console.log("Product ID:", productId);
  console.log("Action:", action);
  return NextResponse.next();
}
export const config = {
  matcher: '/product/:path*' // Adjust matcher to your need
};