#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from typing import TypeVar, Generic

from pydantic import BaseModel

TData = TypeVar("TData")

class Response(BaseModel, Generic[TData]):
    data: TData

    def json(self, **kwargs):
        return self.model_dump_json(**kwargs)
    

response = Response[str](
    data="Hello, World!"
)
print(response.model_json_schema())