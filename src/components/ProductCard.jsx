import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star } from "./icons/icons";

export function ProductCard({ product }) {
  const renderStars = (rating, reviewCount) => {
    return (
      <div className="flex items-center gap-1 mb-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
              filled={i < rating}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">({reviewCount || 0})</span>
      </div>
    );
  };

  return (
    <Card className="product-card">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="product-image"
          />
          <Badge variant="new" className="absolute top-2 right-2">
            New
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          {renderStars(product.rating || 4, product.reviewCount || 12)}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              {(product.basePrice || 0).toLocaleString("vi-VN")}₫
            </span>
            <Button size="sm" className="bg-gray-900 hover:bg-gray-800">
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
